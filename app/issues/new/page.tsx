"use client";
import React from "react";
import { TextArea, TextField, Button } from "@radix-ui/themes";
const page = () => {
  return (
    <div className="max-w-2xl p-5 space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description " />
      <Button>Add Issue</Button>
    </div>
  );
};

export default page;
