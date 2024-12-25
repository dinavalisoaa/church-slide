import React, { useState } from "react";
import { useAddCategoryMutation } from "./graphql/GraphQL";

const AddCategoryForm: React.FC = () => {
  const [name, setName] = useState("");
  const [typeInfoId, setTypeInfoId] = useState("");
  const [addCategory, { data, loading, error }] = useAddCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addCategory({
        variables: {
          name,
          typeInfoId,
        },
      });
      console.log("Category added:", result.data?.addCategory);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type Info ID"
        value={typeInfoId}
        onChange={(e) => setTypeInfoId(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Add Category
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Category added successfully: {data.addCategory.name}</p>}
    </form>
  );
};

export default AddCategoryForm;
