import axios from "axios";

const addCommentForm = document.getElementById("js-addComment");
const commentList = document.getElementById("js-commentList");

const increaseNumber = () => {
  const commentNumber = document.getElementById("jsCommentNumber");
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const addComment = (comment, commentId) => {
  const commentsContainer = document.createElement("div");

  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  delBtn.id = commentId;
  commentsContainer.classList.value = "flex justify-center items-center";
  delBtn.classList.add("fas");
  delBtn.classList.add("fa-trash-alt");
  delBtn.classList.add("ml-2");
  delBtn.classList.add("cursor-pointer");

  span.innerHTML = comment;
  span.classList.value = "text-teal-200";
  li.appendChild(span);
  li.classList.value = "w-64 max-w-6xl h-auto m-2 p-3 bg-teal-500 rounded-md";
  commentsContainer.appendChild(li);
  commentsContainer.appendChild(delBtn);
  commentList.prepend(commentsContainer);
  increaseNumber();
};
const sendComment = async (comment) => {
  const toiletId = window.location.href.split("/toilets/")[1];
  const response = await axios({
    url: `/api/${toiletId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    const commentId = response.data;
    addComment(comment, commentId);
  }
};
const handleSubmit = (event) => {
  // 댓글을 쓴 후 페이지가 새로고침되는 것을 막는다.
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  commentInput.value = "";
  sendComment(comment);
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
};
if (addCommentForm) {
  init();
}
