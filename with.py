
with open("calcultor/config.txt", "w") as file:
    file.write('daniel ')
with open("calcultor/config.txt", "r") as file:
    content = file.read()
    print(content)






path_config=r'config.txt'

try:
    with open(path_config, "r") as file:
        content = file.read()
      

except FileNotFoundError:
    with open(path_config, "w") as file:
        file.write('guest')
    content = 'guest'
    print('the file was not found')



else:
    
    print('welcome , ' + content)

finally:
    print('the program has ended')


