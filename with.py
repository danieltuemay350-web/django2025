
with open("calcultor/config.txt", "w") as file:
    file.write('daniel is a good boy')
with open("calcultor/config.txt", "r") as file:
    content = file.read()
    print(content)







path_config=r'config.txt'
path_config = r'calcultor/config.txt'

try:
    with open(path_config, "r") as file:
        content = file.read()
        print(content)

except FileNotFoundError:
    with open(path_config, "w") as file:
        file.write('guest')
    content = 'guest'
    print('the file was not found')

else:
    print('welcome , ' + content)

finally:
    print('the program has ended')

