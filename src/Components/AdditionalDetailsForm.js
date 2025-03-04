import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdditionalDetailsForm.css";

function AdditionalDetailsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    roll_number: "",
    grade: "",
    section: "",
    department_id: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // Departments for dropdown
  const departments = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Electrical Engineering" },
    { id: 3, name: "Mechanical Engineering" },
    { id: 4, name: "Civil Engineering" },
    { id: 5, name: "Business Administration" },
  ];

  // Retrieve stored data on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("signupData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData((prev) => ({
        ...prev,
        email: parsedData.email || "",
        name: parsedData.name || "",
        roll_number: parsedData.roll_number || "",
        grade: parsedData.grade || "",
        section: parsedData.section || "",
        department_id: parsedData.department_id || "",
        role: parsedData.role || "",
       password: parsedData.password || "",
      }));
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.roll_number.trim())
      newErrors.roll_number = "Roll Number is required";
    if (!formData.grade.trim()) newErrors.grade = "Grade is required";
    if (!formData.section.trim()) newErrors.section = "Section is required";
    if (!formData.department_id)
      newErrors.department_id = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare the data object with only the specified fields
    const submissionData = {
       email: formData.email, 
      password: formData.password, 
      role: formData.role,
      name: formData.name,
      roll_number: formData.roll_number,
      grade: formData.grade,
      section: formData.section,
      department_id: formData.department_id,
    };
    console.log("Form Data Before Submission:", formData);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("signupData");

        setApiResponse({
          success: true,
          message: "Data saved successfully! Redirecting...",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setApiResponse({
          success: false,
          message: data.message || "Error saving data.",
        });
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: error.message || "An error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Details</h2>

      {apiResponse && (
        <p className={`response ${apiResponse.success ? "success" : "error"}`}>
          {apiResponse.message}
        </p>
      )}

      <div className="form-group">
        <label>Email</label>
        <input type="email" value={formData.email} disabled />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Roll Number</label>
        <input
          type="text"
          name="roll_number"
          value={formData.roll_number}
          onChange={handleInputChange}
        />
        {errors.roll_number && <p className="error">{errors.roll_number}</p>}
      </div>

      <div className="form-group">
        <label>Grade</label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
        />
        {errors.grade && <p className="error">{errors.grade}</p>}
      </div>

      <div className="form-group">
        <label>Section</label>
        <input
          type="text"
          name="section"
          value={formData.section}
          onChange={handleInputChange}
        />
        {errors.section && <p className="error">{errors.section}</p>}
      </div>

      <div className="form-group">
        <label>Department</label>
        <select
          name="department_id"
          value={formData.department_id}
          onChange={handleInputChange}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.department_id && (
          <p className="error">{errors.department_id}</p>
        )}
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Graduated">Graduated</option>
        </select>
      </div>

      <button
        className={`submit-button ${isSubmitting ? "disabled" : ""}`}
        onClick={handleSubmit}
      >
        {isSubmitting ? "Submitting..." : "Save & Proceed"}
      </button>
    </div>
  );
}

export default AdditionalDetailsForm;
