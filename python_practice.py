"""

1) A shop gives a discount if a customer buys more than 3 items.
Write a program that asks the user for the number of items they want
to buy and prints:
"Discount applied" if items > 3
"No discount" otherwise


"""
item = int(input("Enter the number of items you want to buy: "))
orginal_price = 20
def discount():
    if item > 3:
        price = orginal_price* item * 0.95
        print("Discount applied")
    else:
        price =item*orginal_price 
        print("No discount")
    return price

#price = discount()
#print("you are buying " , item , "items ,your fee is " , price ,"$")


"""
2, You are given a list of product prices:
prices = [120, 45, 300, 85, 150]
Write a function get_expensive_products(prices) that returns a new
list containing only the prices greater than 100.
"""

prices = [120, 45, 300, 85, 150]
exp_price=[]
def get_expensive_products():
    for price in prices:
     
        if price > 100:
            exp_price.append(price)
          
    return exp_price
    
#get_expensive_products()
    
#print(exp_price)
"""


"""

try:
        
    with open("log.txt", "a") as file:
        file.write("User logged in\n")

    
    with open("log.txt", "r") as file:
        print(file.read())


except  FileNotFoundError as e:
    print("file not found")
finally :
    print("Done")


"""
You are building a small student grade system.
Write a function:
get_grade(student_grades, student_name)
It should:
Try to return the student’s grade from a dictionary
If the student does not exist, catch the exception and return:
"Student not found in the system
"""

grade ={"ABBEBE": "A","KEBEDE":"A+" ,"CHALTU" : "B" ,"FEVEN" : "F"}

def get_grade():
 print(grade[input('type your name, to see your grade ').upper()])
try:
  #  get_grade()
  pass
except KeyError as e:
    print("student not found")
finally:
    print(" DONE")



"""
You receive a file called sales.txt where each line should contain a
sales number
Example:
200
450
abc

700"""
valid_input=[]
total =0 
try:
    with open('sales.txt')as file:
        content =file.read()
       
    for line in content.splitlines():
        content = line
        if type(int(content.strip())) == int:
            i= int(content.strip()) 
      
      
except ValueError as e:
   pass
    # print('your current input is',   "'",content,"' which invalid input ",' please check your input again')
finally :
   print("program ended")
   
try:
    with open('calcultor/sales.txt')as file:
        content =file.read()
    
        
    for line in content.splitlines():
        content = line
        try:
            if type(int(content.strip())) == int:
                i= int(content.strip()) 
                valid_input.append(i)
                total  +=i 
        except ValueError as e:
               print('your current input is',"'",content,"' which invalid input ",' please check your input again')
               continue
               
except ValueError as e:
    print('your current input is',"'",content,"' which invalid input ",' please check your input again')
    
finally :
   print('your sales are ', valid_input)
   print('total:',total)
   print("program ended")

try:
    with open('log.txt', 'r') as file:  
       up=file.read().strip()
       print(up.upper())
        
except FileNotFoundError:
    print("No such file found")

finally:
   # print("")
    print("Done")

"""
7.Given an integer n, return a string array answer (1-indexed) where:
answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
 answer[i] == "Fizz" if i is divisible by 3.
answer[i] == "Buzz" if i is divisible by 5.
answer[i] == i (as a string) if none of the above conditions are true.
Example 1:
Input: n = 3
Output: ["1","2","Fizz"]
Example 2:
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]   """
answer=[]
try:
    x=int(input("enter a  number: "))
 
    for i in range(x):
        i+=1
        if i%5==0 and i%3==0:
            answer.append("FizzBuzz")
        elif i%5==0:
            answer.append("Buzz")
        elif i%3==0:
            answer.append("Fizz")
        else:
            answer.append(i)
except ValueError as e:
    print("enter a number")
finally:
    print("output: ",answer)

"""
Given an integer array nums, move all 0's to the end of it while maintaining the
relative order of the non-zero elements.
Note that you must do this in-place without making a copy of the array.
Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:
Input: nums = [0]
Output: [0]
"""
nums = [0, 1, 0, 3, 12,30,7,200]
x = 0

for num in nums:
    if num != 0:
        nums[x] = num
        x += 1

while x < len(nums):
    nums[x] = 0
    x += 1

print(nums)


"""9.Given an array of integers nums and an integer target, return indices of the two
numbers such that they add up to target. You may assume that each input would have
exactly one solution, and you may not use the same element twice.
You can return the answer in any order.
Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:
sInput: nums = [3,2,4], target = 6
Output: [1,2]
"""
nums=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
target=int(input("enter the targeted number :"))


output=[]
for i in nums:
    x=i

    complement=target-x
    if complement>0 and i+ complement==target:
        output.insert(nums.index(complement),nums.index(x))
        
    else:
       continue
   

print("numbers :" ,nums)
print("expected target can be obtained by adding two numbers located in index =>" ,output)


"""Given an integer x, return true if x is a palindrome, and false otherwise.
Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-.
Therefore it is not a palindrome.
"""
x=input("enter a word or a number that can be read the same in backward and forward: ")
def reversecheck():
    y=str(x)
    return y==y[::-1]
print(reversecheck())


"""
11. Given a non-negative integer x, return the square root of x rounded down to the
nearest integer. The returned integer should be non-negative as well.
You must not use any built-in exponent function or operator.
For example, do not use x ** 0.5
Example 2: Input: x = 8 Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the
nearest integer, 2 is returned.
Example 1:
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
"""

sqr_num=int(input("enter a number and let us find the square root together : "))
def root(sqr_num):
    if sqr_num<2:
        return sqr_num
    check=sqr_num
    while check*check>sqr_num:
        check=(check +sqr_num//check)//2
    return check

print(root(sqr_num))



"""12. A file named numbers.txt contains one number per line.
examples numbers.txt:
10
20
30
abc
40
Write a program that:
Reads each line
Converts valid numbers to integers
Ignores invalid lines (use try/except)
Prints the sum of all valid integers
Expected output:
Sum = 100 (because "abc" is skipped)

"""
sum = 0  

try:
    with open('numbers.txt', 'r') as file:  
        for line in file: 
            line = line.strip()  
            try:
                number = int(line)  
                sum += number
            except ValueError:
                print(f'"{line}" is skipped')  

except FileNotFoundError:
    print("No such file found")

finally:
    print("Sum =" ,sum)
    print("Done")


"""13. Read File and Convert All Text to Uppercase
Write a program that:
Reads a file
Converts all text to uppercase
Displays it on the screen
Uses try/except to handle missing file errors
Input: message.txt:
Hello World
Python is fun
output:
HELLO WORLD
PYTHON IS FUN
"""


try:
    with open('log.txt', 'r') as file:  
       up=file.read().strip()
       print(up.upper())
        
except FileNotFoundError:
    print("No such file found")

finally:

    print("Done")

    """
14, You are given a dictionary storing student scores:
scores = {"John": 85,
"Sara": 92,
"Fraol": 78}
Write a program that:
1.Asks the user to enter a student name.
2. Tries to print the student’s score from the dictionary.
3.If the key does not exist, catch the exception and print:
"Student not found!"
Example:
Input: Mark
Output: Student not found!
"""
scores = {"John": 85,
"Sara": 92,
"Fraol": 78,"daniel":100}
search =input("input a student name ")
try:
    
    for name in scores.keys():
        if name.upper() == search.upper():
            print(scores[name])
        else:
            raise NameError
except NameError:
    print("no student with this name")
finally:
    print("Done")


"""
15. Write a program that:
Takes a sentence as input
Splits it into words
Stores the frequency of each word in a dictionary
Prints the dictionary
Example:
Input: "python is fun and python is powerful"
Output: {"python": 2,
"is": 2,
"fun": 1,
"and": 1,
"powerful": 1}
"""
sentence = "python is fun and python is powerful"
words = sentence.split() 
output1 = {}  
for word in words:
    if word in output1:
        output1[word] += 1 
    else:
        output1[word] = 1  

print(output1)

"""
16. Create a new dictionary where the keys become values and
values become keys.
Example:
Input: grades = {"John": "A"
,
"Sara": "B"
,
"Musa": "A"}
output: {"A": ["John"
,
"Musa"],
"B": ["Sara"]}
"""
grades = {"John": "A", "Sara": "B", "Musa": "A"}

inverted = {} 

for student, grade in grades.items():
    if grade in inverted:
        inverted[grade].append(student) 
    else:
        inverted[grade] = [student]     

print(inverted)
