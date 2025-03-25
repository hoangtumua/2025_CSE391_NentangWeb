// Đợi cho trang web tải xong trước khi thực thi mã JavaScript
document.addEventListener("DOMContentLoaded", function () 
{
    
    // Lấy danh sách sự kiện từ Local Storage, nếu không có thì khởi tạo mảng rỗng
    let events = JSON.parse(localStorage.getItem("events")) || [];
    
    // Biến này lưu chỉ mục của sự kiện đang chỉnh sửa, mặc định là -1 (không có sự kiện nào được chọn)
    let editIndex = -1; 

    // Lấy các phần tử HTML cần thiết từ trang
    const eventList = document.getElementById("eventList"); // Bảng hiển thị danh sách sự kiện
    const eventName = document.getElementById("eventName"); // Ô nhập tên sự kiện
    const eventDate = document.getElementById("eventDate"); // Ô chọn ngày diễn ra sự kiện
    const eventLocation = document.getElementById("eventLocation"); // Ô nhập địa điểm
    const eventStatus = document.getElementById("eventStatus"); // Dropdown chọn trạng thái sự kiện
    const addEventBtn = document.getElementById("addEvent"); // Nút "Thêm sự kiện"
    const updateEventBtn = document.getElementById("updateEvent"); // Nút "Cập nhật sự kiện" (ban đầu ẩn đi)
    const filterStatus = document.getElementById("filterStatus"); // Dropdown lọc theo trạng thái sự kiện

    // Hàm hiển thị danh sách sự kiện lên bảng
    function renderEvents(filter = "all") {
        eventList.innerHTML = ""; // Xóa danh sách cũ trước khi cập nhật
        events.forEach((event, index) => { // Duyệt qua tất cả các sự kiện
            if (filter === "all" || event.status === filter) { // Kiểm tra nếu cần lọc theo trạng thái
                let row = `<tr>
                    <td>${event.name}</td> <!-- Hiển thị tên sự kiện -->
                    <td>${event.date}</td> <!-- Hiển thị ngày diễn ra -->
                    <td>${event.location}</td> <!-- Hiển thị địa điểm -->
                    <td>${event.status}</td> <!-- Hiển thị trạng thái -->
                    <td>
                        <button onclick="editEvent(${index})">Sửa</button> <!-- Nút chỉnh sửa -->
                        <button onclick="deleteEvent(${index})" style="background: red;">Xóa</button> <!-- Nút xóa -->
                    </td>
                </tr>`;
                eventList.innerHTML += row; // Thêm dòng vào bảng
            }
        });
    }

    // Hàm xóa sự kiện
    window.deleteEvent = function (index) {
        events.splice(index, 1); // Xóa sự kiện tại vị trí index
        localStorage.setItem("events", JSON.stringify(events)); // Lưu lại danh sách vào Local Storage
        renderEvents(); // Cập nhật lại danh sách sự kiện trên giao diện
    };

    // Hàm chỉnh sửa sự kiện
    window.editEvent = function (index) {
        editIndex = index; // Lưu chỉ mục sự kiện đang chỉnh sửa
        let event = events[index]; // Lấy dữ liệu của sự kiện cần chỉnh sửa
        eventName.value = event.name; // Điền dữ liệu vào ô nhập liệu
        eventDate.value = event.date;
        eventLocation.value = event.location;
        eventStatus.value = event.status;
        addEventBtn.style.display = "none"; // Ẩn thêm
        updateEventBtn.style.display = "block"; // Hiển Cập nhật 
    };

    // Hàm cập nhật sự kiện sau khi chỉnh sửa
    updateEventBtn.addEventListener("click", function () {
        if (editIndex !== -1) { // Kiểm tra xem có sự kiện nào đang được chỉnh sửa không
            events[editIndex] = { // Cập nhật sự kiện tại vị trí editIndex
                name: eventName.value,
                date: eventDate.value,
                location: eventLocation.value,
                status: eventStatus.value,
            };
            localStorage.setItem("events", JSON.stringify(events)); // Lưu dữ liệu vào Local Storage
            resetForm();
            renderEvents(); // udate
        }
    });

    // Hàm thêm mới sự kiện
    addEventBtn.addEventListener("click", function () {
        let newEvent = { // Tạo đối tượng sự kiện mới
            name: eventName.value,
            date: eventDate.value,
            location: eventLocation.value,
            status: eventStatus.value,
        };
        events.push(newEvent); // Thêm sự kiện vào danh sách
        localStorage.setItem("events", JSON.stringify(events)); // Lưu danh sách vào Local Storage
        resetForm(); // Xóa nội dung trong form sau khi thêm xong
        renderEvents(); // Cập nhật danh sách sự kiện
    });

    // Hàm đặt lại form về trạng thái ban đầu
    function resetForm() {
        eventName.value = ""; // Xóa nội dung trong ô nhập tên sự kiện
        eventDate.value = "";
        eventLocation.value = "";
        eventStatus.value = "Sắp diễn ra"; 
        addEventBtn.style.display = "block"; 
        updateEventBtn.style.display = "none"; // Ẩn nút "Cập nhật sự kiện"
        editIndex = -1; // Đặt lại chỉ mục chỉnh sửa
    }

    // Lọc danh sách sự kiện theo trạng thái
    document.getElementById("filterButton").addEventListener("click", function () {
        renderEvents(filterStatus.value); // Gọi hàm hiển thị với giá trị lọc được chọn
    });

    renderEvents(); // Gọi hàm hiển thị danh sách sự kiện khi trang được tải lần đầu
});
