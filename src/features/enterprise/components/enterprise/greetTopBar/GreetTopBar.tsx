"use client";

import { useEffect, useState } from "react";

const getGreeting = (hour: number) => {
  if (hour < 12) return "Good Morning!";
  if (hour < 18) return "Good Afternoon!";
  return "Good Evening!";
};

const formatDate = (date: Date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
};

export const GreetTopBar = () => {
  const [greeting, setGreeting] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const now = new Date();
    setGreeting(getGreeting(now.getHours()));
    setDateString(formatDate(now));
  }, []);

  return (
    <div>
      <span className="greeting">{greeting}</span>
      <span className="date">{dateString}</span>
    </div>
  );
};
