import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import BlogModel from '@/lib/models/BlogModel.js';
import dbConnect from '@/lib/config/db.js';
import { request } from 'http';

const fs = require('fs');

const LoadDB = async () => {
    await dbConnect();
}

LoadDB();

export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get('id');
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        if (blog) {
            return NextResponse.json({ blog });
        } else {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs });
    }
    
}

export async function POST(request) {
    try {
        console.log('POST request received');
        const contentType = request.headers.get('content-type');
        console.log('Content-Type:', contentType);
        
        // Try to parse as FormData first
        try {
            const formData = await request.formData();
            console.log('FormData parsed successfully');
            
            const timestamp = Date.now();
            const image = formData.get('image');
            
            console.log('Image from formData:', image);
            console.log('Image type:', typeof image);
            console.log('Image name:', image?.name);
            console.log('Image size:', image?.size);
            
            if (!image) {
                console.log('No image found in formData');
                return NextResponse.json({ 
                    error: 'No image file provided in formData' 
                }, { status: 400 });
            }
            
            if (typeof image === 'string') {
                console.log('Image is a string, not a file');
                return NextResponse.json({ 
                    error: 'Image field contains text, not a file' 
                }, { status: 400 });
            }

            const imageByteData = await image.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const path = `./public/${timestamp}_${image.name}`;
            await writeFile(path, buffer);
            const imgUrl = `/${timestamp}_${image.name}`;
            console.log('Image saved successfully:', imgUrl);
            
            const blogData = {
                title: `${formData.get('title')}`,
                description: `${formData.get('description')}`,
                category: `${formData.get('category')}`,
                author: `${formData.get('author')}`,
                image: `${imgUrl}`,
                
                authorImg: `${formData.get('authorImg')}`
            }
            await BlogModel.create(blogData);

       return NextResponse.json({ success: true, msg: "Blog adicionado com sucesso!" });
        } catch (formDataError) {
            console.log('FormData parsing failed, trying JSON:', formDataError.message);
            
            // If FormData fails, try JSON
            try {
                const data = await request.json();
                console.log('JSON data received:', data);
                
                return NextResponse.json({ 
                    message: 'Blog data received as JSON',
                    data: data 
                });
            } catch (jsonError) {
                console.log('JSON parsing also failed:', jsonError.message);
                return NextResponse.json({ 
                    error: 'Unable to parse request body as FormData or JSON',
                    formDataError: formDataError.message,
                    jsonError: jsonError.message
                }, { status: 400 });
            }
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ 
            error: 'Failed to process request',
            details: error.message 
        }, { status: 500 });
    }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`, () => {});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: 'Blog deletado com sucesso!' });
}
