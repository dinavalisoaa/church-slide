import React from "react";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { Form } from "./../components/ui/form";

const FormComponent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
  };

  return (
    <Form className="space-y-4 p-4 border rounded-md shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name" className="block mb-2">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="w-full"
          required
        />
      </div>

      <div>
        <Label htmlFor="email" className="block mb-2">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </Form>
  );
};

export default FormComponent;
