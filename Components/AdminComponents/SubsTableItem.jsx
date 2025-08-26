import React from "react";

const SubsTableItem = ({ email, mongoId, deleteEmail, date}) => {
    
    const emailDate = new Date(date);

    return (
        <tr className="bg-white border-b">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {email? email: "No Email"}
            </td>
            <td className="px-6 py-4 hidden sm:block">{emailDate.toLocaleDateString()}</td>
            <td className="px-6 py-4">
                <button onClick={() => deleteEmail(mongoId)}>x</button>
            </td>
        </tr>
    );
}

export default SubsTableItem;
