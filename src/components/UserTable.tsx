import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  users: User[];
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<Props> = ({ users, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-7xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-accent mb-1">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                Birthdate:{" "}
                <span className="text-gray-800">
                  {new Date(user.birthDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Created:{" "}
                <span className="text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Last updated:{" "}
                <span className="text-gray-800">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </span>
              </p>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => navigate(`/users/edit/${user.id}`)}
                className="px-3 py-1 text-sm text-white bg-primary rounded hover:bg-cyan-700"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
