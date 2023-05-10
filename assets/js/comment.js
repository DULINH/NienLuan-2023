// Xây dựng thuật toán comment bằng jQuery
$(document).ready(function () {
  // Tải các bình luận đã có từ localStorage
  if (localStorage.getItem('comments')) {
    $('#comment-section').html(localStorage.getItem('comments'));
  }

  // Gửi biểu mẫu bình luận
  $('#comment-form').on('submit', function (event) {
    event.preventDefault(); // Ngăn chặn biểu mẫu gửi và tải lại trang

    // Lấy tên và nội dung bình luận từ các đầu vào
    var name = $('#name').val();
    var comment = $('#comment').val();

    // Tạo đối tượng bình luận mới với tên, nội dung và một mảng rỗng để lưu các trả lời
    var newComment = { name: name, comment: comment, replies: [] };

    // Tạo phần tử bình luận mới và thêm vào phần bình luận
    var commentElement = createCommentElement(newComment);
    $('#comment-section').append(commentElement);

    // Lưu phần bình luận vào localStorage
    localStorage.setItem('comments', $('#comment-section').html());

    // Xóa các đầu vào
    $('#name').val('');
    $('#comment').val('');
  });

  // Chuyển đổi biểu mẫu trả lời khi nhấp vào nút "Trả lời"
  $(document).on('click', '.reply-btn', function () {
    var replyForm = $(this).siblings('.reply-form');
    replyForm.toggle();
  });

  // Gửi biểu mẫu trả lời
  $(document).on('submit', '.reply-form', function (event) {
    event.preventDefault(); // Ngăn chặn biểu mẫu gửi và tải lại trang

    // Lấy tên và nội dung trả lời từ các đầu vào
    var name = $(this).find('.reply-name').val();
    var reply = $(this).find('.reply-comment').val();

    // Tạo đối tượng trả lời mới với tên và nội dung
    var newReply = { name: name, reply: reply };

    // Lấy chỉ mục bình luận từ thuộc tính dữ liệu của biểu mẫu trả lời
    var commentIndex = $(this).data('comment-index');

    // Thêm trả lời vào đối tượng bình luận và cập nhật phần tử bình luận
    comments[commentIndex].replies.push(newReply);
    var commentElement = createCommentElement(comments[commentIndex]);
    $(this).closest('.comment').replaceWith(commentElement);

    // Lưu phần bình luận vào localStorage
    localStorage.setItem('comments', $('#comment-section').html());

    // Xóa các đầu vào và ẩn biểu mẫu trả lời
    $(this).find('.reply-name').val('');
    $(this).find('.reply-comment').val('');
    $(this).hide();
  });
});

// Hàm trợ giúp để tạo một phần tử bình luận mới từ một đối tượng bình luận
function createCommentElement(comment) {
  // Tạo phần tử bình luận với tên và nội dung
  var commentElement = $('<div class="comment"><strong>' + comment.name + ':</strong> ' + comment.comment + '</div>');

  // Thêm nút trả lời vào phần tử bình luận
  var replyButton = $('<button class="btn btn-secondary reply-btn">Trả lời</button>');
  commentElement.append(replyButton);

  // Thêm biểu mẫu trả lời vào phần tử bình luận
  var replyForm = $('<form class="reply-form" data-comment-index="' + comments.length + '"><div class="mb-3"><label for="reply-name">Họ tên:</label><input type="text" class="form-control reply-name" id="reply-name" name="reply-name"></div><div class="mb-3"><label for="reply-comment">Trả lời:</label><textarea class="form-control reply-comment" id="reply-comment" name="reply-comment"></textarea></div><button type="submit" class="btn btn-primary">Gửi</button></form>');
  commentElement.append(replyForm);

  // Thêm các trả lời vào phần tử bình luận
  if (comment.replies.length > 0) {
    var repliesElement = $('<div class="replies"></div>');
    for (var i = 0; i < comment.replies.length; i++) {
      var replyElement = $('<div class="reply"><strong>' + comment.replies[i].name + ':</strong> ' + comment.replies[i].reply + '</div>');
      repliesElement.append(replyElement);
    }
    commentElement.append(repliesElement);
  }

  // Thêm chỉ mục bình luận vào biểu mẫu trả lời để sử dụng sau này
  replyForm.data('comment-index', comments.length);

  // Thêm đối tượng bình luận vào mảng bình luận
  comments.push(comment);

  return commentElement;
}

// Khởi tạo mảng bình luận
var comments = [];