def print_custom_pyramid(input_str):
    length = len(input_str)
    

    for i in range(length):
        
        current_level = input_str[i::-1] + input_str[1:i+1]

        spaces = ' ' * (length - i - 1)

        print(spaces + current_level)

# รับ input จากผู้ใช้
user_input = input("Input text: ")

# เรียกใช้งานฟังก์ชันเพื่อแสดงผลพีระมิด
print_custom_pyramid(user_input)
