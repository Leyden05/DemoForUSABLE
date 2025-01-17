"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://localhost:5199/api";

export default function OhCRUD() {
  const [discounts, setDiscounts] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [formState, setFormState] = useState({});
  const [editingEntity, setEditingEntity] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [discountsRes, taxesRes, employeesRes, menuItemsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/discount`),
          fetch(`${API_BASE_URL}/tax`),
          fetch(`${API_BASE_URL}/employee`),
          fetch(`${API_BASE_URL}/menuItem`),
        ]);
        setDiscounts(await discountsRes.json());
        setTaxes(await taxesRes.json());
        setEmployees(await employeesRes.json());
        setMenuItems(await menuItemsRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (entity, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${entity}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert(`${entity} deleted successfully.`);
        // Refresh the list
        setFormState({});
      } else {
        alert(`Failed to delete ${entity}.`);
      }
    } catch (error) {
      console.error(`Error deleting ${entity}:`, error);
    }
  };

  const handleSubmit = async (entity) => {
    const url = editingEntity
      ? `${API_BASE_URL}/${entity}/${formState.id}`
      : `${API_BASE_URL}/${entity}`;
    const method = editingEntity ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        alert(`${editingEntity ? "Updated" : "Created"} successfully.`);
        setEditingEntity(null);
        setFormState({});
      } else {
        alert("Failed to save.");
      }
    } catch (error) {
      console.error("Error saving entity:", error);
    }
  };

  const startEdit = (entity, item) => {
    setFormState({ ...item });
    setEditingEntity(entity);
  };

  const renderTable = (data, entity) => (
    <div className="my-6">
      <h2 className="text-2xl font-bold">{entity.charAt(0).toUpperCase() + entity.slice(1)}</h2>
      <table className="w-full bg-gray-800 text-white rounded-lg mt-4">
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key} className="p-2 border-b">{key}</th>
            ))}
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-700">
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="p-2 border-b">{value}</td>
              ))}
              <td className="p-2 border-b">
                <button
                  onClick={() => startEdit(entity, item)}
                  className="bg-blue-500 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entity, item.id)}
                  className="bg-red-500 px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Data</h1>

      {/* Render CRUD Tables */}
      {renderTable(discounts, "discount")}
      {renderTable(taxes, "tax")}
      {renderTable(employees, "employee")}
      {renderTable(menuItems, "menuItem")}

      {/* Add/Edit Form */}
      <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg">
        <h2 className="text-2xl font-bold">{editingEntity ? "Edit" : "Add"} Entity</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(editingEntity || "menuItem");
          }}
        >
          {Object.keys(formState || {}).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium mb-2">{key}</label>
              <input
                type="text"
                value={formState[key]}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded mr-2"
          >
            {editingEntity ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormState({});
              setEditingEntity(null);
            }}
            className="bg-gray-500 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
      <button
            onClick={() => router.push("/orders")}
            className="mt-4 p-2 bg-green-500 text-white w-full rounded-xl"
        >
            View All Orders
        </button>
        <button
            onClick={() => router.push("/place-order")}
            className="mt-4 p-2 bg-neutral-500 text-white w-full rounded-xl"
        >
            Place Order
        </button>
    </div>
  );
}
