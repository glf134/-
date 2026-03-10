import React from 'react';
import { MOCK_USERS } from '../services/mockService';
import { UserRole } from '../types';
import { Mail, Shield, Trash2, Edit2 } from 'lucide-react';

export const UserManagement: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
           <p className="text-slate-500">Manage access and roles for the SmartBid system.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
           Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {MOCK_USERS.map(user => (
               <tr key={user.id} className="hover:bg-slate-50">
                 <td className="px-6 py-4 flex items-center space-x-3">
                    <img src={user.avatar} alt="" className="w-8 h-8 rounded-full bg-slate-200" />
                    <span className="font-medium text-slate-900">{user.name}</span>
                 </td>
                 <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium border ${
                        user.role === UserRole.ADMIN ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        user.role === UserRole.MANAGER ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                        <Shield size={12} />
                        <span>{user.role}</span>
                    </span>
                 </td>
                 <td className="px-6 py-4 text-slate-500 flex items-center space-x-2">
                    <Mail size={14} />
                    <span>{user.email}</span>
                 </td>
                 <td className="px-6 py-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>
                    <span className="text-sm text-slate-600">Active</span>
                 </td>
                 <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500">
                        <Edit2 size={16} />
                    </button>
                    <button className="p-1 hover:bg-red-50 rounded text-red-500">
                        <Trash2 size={16} />
                    </button>
                 </td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
