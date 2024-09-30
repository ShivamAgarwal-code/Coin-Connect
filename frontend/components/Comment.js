"use client";

import React, { useState } from "react";

const Comment = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    setComments([...comments, { text: comment, replies: [] }]);
    event.target.comment.value = "";
    event.target.comment.style.height = "h-0";
  };

  const handleReplySubmit = (event, index) => {
    event.preventDefault();
    const reply = event.target.reply.value;
    const newComments = [...comments];
    newComments[index].replies.push({ text: reply, replies: [] });
    setComments(newComments);
    event.target.reply.value = "";
  };

  const renderComments = (comments) => {
    return comments.map((comment, index) => (
      <div key={index} className="mb-4 ml-4">
        <p className="text-gray-900">{comment.text}</p>
        <form
          onSubmit={(event) => handleReplySubmit(event, index)}
          className="ml-4 mt-2"
        >
          <div className="mb-2">
            <textarea
              className="w-full h-16 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
              name="reply"
              placeholder="Reply to this comment"
            ></textarea>
          </div>
          <button className="px-3 py-2 text-sm text-purple-100 bg-purple-600 rounded">
            Reply
          </button>
        </form>
        {comment.replies.length > 0 && renderComments(comment.replies)}
      </div>
    ));
  };

  return (
    <div className=" shadow-md ">
      <form onSubmit={handleCommentSubmit} className="w-full p-4">
        <div className="mb-2">
          <label htmlFor="comment" className="text-lg text-gray-600">
            Add a comment
          </label>
          <textarea
            className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder="Enter your comment"
          ></textarea>
        </div>
        <button className="px-3 py-2 text-sm text-purple-100 bg-purple-600 rounded">
          Comment
        </button>
      </form>
      {comments.length > 0 && renderComments(comments)}
    </div>
  );
};

export default Comment;
