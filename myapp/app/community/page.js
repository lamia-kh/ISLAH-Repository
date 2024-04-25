'use client'
import Slider from 'react-slick';
import React, { useState } from 'react';
import styles from "@/public/css/other.css/community.css";

function Community() {
  const [sortBy, setSortBy] = useState('date'); // State variable to track sorting option
  const [examples, setExamples] = useState([
    {
      id: 1,
      title: 'Example 1',
      date: 'April 1, 2024',
      images: [
        { id: 1, imageUrl: 'imgs/homepagepic2.svg' },
        { id: 2, imageUrl: 'imgs/homepagepic2.svg' },
      
      ],
      voteCount: 10,
    },
    {
      id: 2,
      title: 'Example 2',
      date: 'April 5, 2024',
      images: [
        { id: 3, imageUrl: 'https://www.example.com/lion.jpg' },
        { id: 4, imageUrl: 'https://www.example.com/elephant.jpg' },
      ],
      voteCount: 8,
    },
    {
      id: 1,
      title: 'Example 3',
      date: 'April 6, 2024',
      images: [
      
        { id: 1, imageUrl: 'imgs/homepagepic2.svg' },
        { id: 2, imageUrl: 'https://www.example.com/cat.jpg' },
      ],
      voteCount: 7,
    },
    // Add more examples if needed
  ]);
  

  // Function to handle sorting option change
  const handleSortChange = (event) => {
    setSortBy(event.target.value); // Update sortBy state when sorting option changes
  };

  // Function to sort examples based on sortBy option
  const sortedExamples = [...examples].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'voteCount') {
      return b.voteCount - a.voteCount;
    }
    return 0;
  });

  // JSX to render examples
  return (
    <>
      <div className="sort-container">
        <label htmlFor="sortBy" className="sort-label">Sort by:</label>
        <select id="sortBy" className="sort-select" onChange={handleSortChange} value={sortBy}>
          <option value="date">Date</option>
          <option value="voteCount">Number of Votes</option>
        </select>
      </div>
      <div className="examples-container">
        {/* Map through sorted examples and render each example */}
        {sortedExamples.map(example => (
          <div className="example" key={example.id}>
            {/* Map through example images and render each image */}
            {example.images.map(image => (
              <img src={image.imageUrl} alt={`Image ${image.id}`} className="example-image" key={image.id} />
            ))}
            <div className="info">
              <span>Title:</span> <span>{example.title}</span>
            </div>
            <div className="info">
              <span>Date:</span> <span>{example.date}</span>
            </div>
            <div className="vote-button-container">
              <button className="vote-button">Vote</button>
              <span className="vote-count">{example.voteCount}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Community;
