import { NextResponse } from 'next/server';
import BlogModel from '../../../lib/models/BlogModel';
import dbConnect from '../../../lib/config/db';

const LoadDB = async () => {
    await dbConnect();
}

LoadDB();

export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get('id');
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        if (blog) {
            // Verificar e corrigir imagens locais quebradas
            if (blog.image && blog.image.startsWith('/') && blog.image.includes('_')) {
                blog.image = 'https://via.placeholder.com/400x200?text=Blog+Image';
                // Salvar a correção no banco
                await BlogModel.findByIdAndUpdate(blogId, { image: blog.image });
            }
            return NextResponse.json({ blog });
        } else {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
    } else {
        const blogs = await BlogModel.find({});
        
        // Corrigir imagens locais quebradas em todos os blogs
        let hasUpdates = false;
        for (let blog of blogs) {
            if (blog.image && blog.image.startsWith('/') && blog.image.includes('_')) {
                blog.image = 'https://via.placeholder.com/400x200?text=Blog+Image';
                await BlogModel.findByIdAndUpdate(blog._id, { image: blog.image });
                hasUpdates = true;
            }
        }
        
        if (hasUpdates) {
            console.log('Corrigidas imagens locais quebradas');
        }
        
        return NextResponse.json({ blogs });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        console.log('POST request received - Database connected');
        const contentType = request.headers.get('content-type');
        console.log('Content-Type:', contentType);
        console.log('Content-Type:', contentType);
        
        // Se for FormData (upload de arquivo)
        if (contentType && contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            console.log('FormData parsed successfully');
            console.log('authorImg from form:', formData.get('authorImg'));
            
            const image = formData.get('image');
            let imageBase64 = '';
            
            if (image && typeof image !== 'string') {
                console.log('Processing image file:', image.name);
                
                // Converter imagem para Base64
                const imageByteData = await image.arrayBuffer();
                const buffer = Buffer.from(imageByteData);
                const mimeType = image.type;
                imageBase64 = `data:${mimeType};base64,${buffer.toString('base64')}`;
                
                console.log('Image converted to Base64 successfully');
            }
            
            const blogData = {
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
                author: formData.get('author'),
                image: imageBase64 || formData.get('imageUrl') || '', // Base64 ou URL
                authorImg: formData.get('authorImg') || ''
            };
            
            console.log('Blog data prepared:', {
                title: blogData.title,
                description: blogData.description?.length + ' chars',
                category: blogData.category,
                author: blogData.author,
                imageLength: blogData.image?.length,
                authorImg: blogData.authorImg
            });
            
            console.log('Creating blog with FormData');
            const newBlog = await BlogModel.create(blogData);
            console.log('Blog created successfully with ID:', newBlog._id);
            
            return NextResponse.json({ 
                success: true, 
                msg: "Blog adicionado com sucesso!" 
            });
        } 
        // Se for JSON (URL de imagem)
        else {
            const data = await request.json();
            console.log('JSON data received:', data);
            
            // Validate required fields
            if (!data.title || !data.description || !data.category || !data.author) {
                return NextResponse.json({ 
                    error: 'Missing required fields: title, description, category, or author' 
                }, { status: 400 });
            }
            
            // Create blog data object
            const blogData = {
                title: data.title,
                description: data.description,
                category: data.category,
                author: data.author,
                image: data.image || '', // URL da imagem ou string vazia
                authorImg: data.authorImg || ''
            };
            
            console.log('Creating blog with JSON data');
            await BlogModel.create(blogData);

            return NextResponse.json({ 
                success: true, 
                msg: "Blog adicionado com sucesso!" 
            });
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
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ 
        success: true, 
        msg: 'Blog deletado com sucesso!' 
    });
}

export async function PUT(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const { id, ...updateData } = data;
        
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedBlog) {
            return NextResponse.json({ 
                success: false, 
                error: 'Blog não encontrado' 
            }, { status: 404 });
        }
        
        return NextResponse.json({ 
            success: true, 
            msg: 'Blog atualizado com sucesso!',
            blog: updatedBlog
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ 
            error: 'Failed to update blog',
            details: error.message 
        }, { status: 500 });
    }
}
