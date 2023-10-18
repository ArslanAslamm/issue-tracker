"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import { Table } from "@radix-ui/themes";
const issuesPage = () => {
  const [issueArray, setIssueArray] = useState([]);
  useEffect(() => {
    const getIssues = async () => {
      const { data } = await axios.get("/api/issues");
      setIssueArray(data);
    };
    getIssues();
  }, []);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-center mb-5">All Issues</h1>
        <Link href="/issues/new">
          <Button>New Issue</Button>
        </Link>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issueArray.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>{issue.id}</Table.Cell>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>{issue.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default issuesPage;
