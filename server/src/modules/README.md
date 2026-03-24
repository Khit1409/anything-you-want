# controller

- Nơi tiếp nhận các request từ client và sử dụng các dữ liệu này cho các service cần thiết xử lý logic và trả về http response cho client.

# service

- Nơi nhận dữ liệu đã được lấy từ request của controller và xử lý (format, tính toán...v.v) sau đó thực hiện các repository để tương tác với dữ liệu và trả kết quả thực hiện cho controller trả response cho client.

# repository

- Nơi tương tác trực tiếp với database để thực hiện chức năng CRUD bằng dữ liệu lấy từ controller qua http request và được xử lý qua service trả về kết quả tương tác cho service.

# dto

- Nơi định nghĩa các request , response từ client gửi đến và từ controller gửi về.

# entity

- Định nghĩa các table của Posgress database bằng thư viện typeorm để các repository sử dụng.

# schema

- Định nghĩa các collection của mongoose database để các repository xử lý.
