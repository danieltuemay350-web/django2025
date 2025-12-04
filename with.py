"""

with open("calcultor/config.txt", "w") as file:
    file.write('daniel is a good boy')
with open("calcultor/config.txt", "r") as file:
    content = file.read()
    print(content)

"""






path_config=r'config.txt'

try:
    with open(path_config, "w") as file:
        file.write('guest')
except FileNotFoundError as e:
    with open(path_config, "w") as file:  
        file.write('the file was created because it was not found')
    print('the file was not found', file)


else:
    with open(path_config, "r") as file:
        content = file.read()
        print(content)
    print('the file was written successfully')


finally:
    print('the program has ended')
