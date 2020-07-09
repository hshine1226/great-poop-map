import axios from "axios";

const delComment = document.querySelectorAll(".fas.fa-trash-alt");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};
const handleClick = async (event) => {
  const commentId = event.target.id;
  const comment = document.getElementById(commentId).parentNode;

  const response = await axios({
    url: `/api/${commentId}/delete`,
    method: "GET",
  });

  if (response.status === 200) {
    comment.remove();
    decreaseNumber();
  }
};
const init = () => {
  for (let i = 0; i < delComment.length; i++) {
    delComment[i].addEventListener("click", handleClick);
  }
};
if (delComment) {
  init();
}
