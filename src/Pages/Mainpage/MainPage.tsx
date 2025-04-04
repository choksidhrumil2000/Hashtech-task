import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { Button, Snackbar, TextField } from "@mui/material";
import { Record } from "../../Interfaces/interfaces";
import RecordsTable from "../../Components/RecordsTable/Recordstable";

const MainPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [formData, setFormData] = useState<Omit<Record, "id" | "valid">>({
    title: "",
    description: "",
    email: "",
    range: 0,
  });
  const [open, setOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    title?: string;
    email?: string;
    range?: string;
  }>({});

  const dummyData = [
    {
      id: 1,
      title: "document1",
      description: "desc1",
      email: "test@test.com",
      range: 32,
      valid: true,
    },
    {
      id: 2,
      title: "document2",
      description: "desc2",
      email: "test2@test.com",
      range: 75,
      valid: false,
    },
    {
      id: 3,
      title: "document3",
      description: "desc3",
      email: "test3@test.com",
      range: 32,
      valid: true,
    },
    {
      id: 4,
      title: "document4",
      description: "desc4",
      email: "test4@test.com",
      range: 32,
      valid: false,
    },
    {
      id: 5,
      title: "document5",
      description: "desc5",
      email: "test5@test.com",
      range: 29,
      valid: true,
    },
  ];

  useEffect(() => {
    const storedData = localStorage.getItem("records");
    if (storedData) {
      setRecords(JSON.parse(storedData));
    } else {
      localStorage.setItem("records", JSON.stringify(dummyData));
      setRecords(dummyData);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });

    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormvalid = () => {
    const newErrors: { title?: string; email?: string; range?: string } = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    const rangeValue = Number(formData.range);
    if (rangeValue <= 0 || rangeValue >= 100) {
      newErrors.range = "Range must be between 1 and 99";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormvalid()) return;
    const newRecord: Record = {
      id: records.length ? records[records.length - 1].id + 1 : 1,
      title: formData.title,
      description: formData.description,
      email: formData.email,
      range: Number(formData.range),
      valid: true,
    };

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
    setFormData({ title: "", description: "", email: "", range: 0 });
    setOpen(true);
  };

  const filteredRecords = records.filter(
    (rec) => rec.valid && rec.range > 29 && rec.range < 61
  );

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Record Submission Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={5}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Range (1-99)"
          name="range"
          type="number"
          value={formData.range}
          onChange={handleChange}
          error={!!errors.range}
          helperText={errors.range}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <h3>Records List</h3>
      <RecordsTable records={filteredRecords} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message="Data Added Successfully!!!"
        autoHideDuration={3000}
      />
    </div>
  );
};

export default MainPage;
