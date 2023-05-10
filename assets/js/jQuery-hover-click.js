// jQuery để chỉnh các hiệu ứng cho hệ thống

// Toggle cho nút mở thanh công cụ tìm kiếm từ vựng 
$(".open-searchbar-btn").click(function () {
  $(".search-container").fadeToggle();
});

// Toggle cho nút mở chatbot - trợ lý ảo 
$(".open-chatbot").click(function () {
  $(".chatbot-container").fadeToggle();
});

// Toggle cho nút bật tắt comment section 
$("#open").click(function () {
  $(".comment-section").fadeToggle();
});

// Toggle cho nút bật tắt kho lưu trữ từ vựng
$(".open-vocab-btn").click(function () {
  $(".vocab-list-container").fadeToggle();
});
