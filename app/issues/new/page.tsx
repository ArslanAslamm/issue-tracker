"use client";
import React from "react";
import { TextArea, TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
const page = () => {
  return (
    <div className="max-w-2xl p-5 space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description " />
      <Button>Add Issue</Button>
    </div>
  );
};

export default page;
