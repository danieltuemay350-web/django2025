with open("calcultor/config.txt", "w") as file:
    file.write('daniel is a good boy')
with open("calcultor/config.txt", "r") as file:
    content = file.read()
    print(content)
with open("calcultor/config.txt", "") as file:
    file.write('\nwelcome to the calcultor program')