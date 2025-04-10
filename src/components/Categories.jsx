import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategories, setEditedCategories] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/v1/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCategories(data?.categories || []);
        setEditedCategories(data?.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [token, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/v1/categories/update-multiple`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categories: editedCategories }),
      });

      setCategories(editedCategories);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  const handleChange = (index, newName) => {
    const updatedCategories = [...editedCategories];
    updatedCategories[index].name = newName;
    setEditedCategories(updatedCategories);
  };

  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={category.id}>
            {isEditing ? (
              <input
                type="text"
                value={editedCategories[index].name}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ) : (
              category.name
            )}
          </li>
        ))}
      </ul>
      <button onClick={isEditing ? handleSaveClick : handleEditClick}>
        {isEditing ? "Save Changes" : "Edit Categories"}
      </button>
    </div>
  );
};

export default Categories;
