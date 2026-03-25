# no 1

class Person:
    def __init__(self,name,age):
        self.name=name
        self.age=age
p1=Person("melkamu",20)
print(p1.name)
print(p1.age)


 #no 2       
class dog:
   def bark():
       return "woof"
Dog=dog.bark()
print(Dog)

#no 3

class car:
    def __init__(self,make):
        self.make = make
    
             
    def get_make(self):
        return self.make
c1=car("made in ethiopia")
print(c1.get_make())


#no 4
class rectangle:
    def __init__(self,w,h):
        self.w=w
        self.h=h
        self.A=h*w

rec=rectangle(5,6)
print(rec.A)

#no 5
class student:
    def __init__(self,name,grade):
        self.name=name
        self.__grade=grade
    def set_grade(self):
        if self.__grade>=95:
             self.__grade="A+"
        return self.__grade
        
    def get_grade(self):
        print(self.name,"your resukt is",self.set_grade())
        return "number 5 is done".upper()
    
stu5=student("daniel".upper(),99)       
print(stu5.get_grade())


#no 6

class employee:
    
    def __init__(self,name,salary):
        self.name=name
        self.salary=salary
    def annual_salary(self):
        annual_salary=self.salary*12
        print("employee ",self.name," your annual salary is ",annual_salary)
        return "question 6 is end here".upper()
emp6=employee("daniel".upper(),10000000*10000000)
print(emp6.annual_salary())


#no 7
class library:
    def __init__(self):

        self.book=[]
    def add_book(self,title):
        self.book.append(title)
        
        return self.book
    def show_book(self):
        print("here are the avilable books" ,self.book)
lib=library()
lib.add_book("math")
lib.add_book("physics")
lib.add_book("chemstry")
lib.add_book("history")
print(lib.show_book())


#8
class Animal:
    def make_sound():
        return "unique sound "
class Cat:
    def make_sound():
        return "meow"

print(Animal.make_sound())
print(Cat.make_sound())


#9
class Vehicle:
    def __init__(self,brand,year):
        self.brand=brand
        self.year=year
    def info(self):
        print("the vehicle model =" ,self.brand," and it is prodoced in ",self.year)
class Car9(Vehicle):
    def __init__(self,brand,year):
        super().__init__(brand,year)
    def info(self):
        print(" the car model is ",self.brand,"and manufacture before ",2026-self.year
              ,"years ago")
        return "Done"

vehc=Vehicle("toyota",2009)
car9=Car9("toyota",2009)
print(vehc.info())
print(car9.info())

#10

class BankAccount:
    def __init__(self,name,balance,deposit,withdraw):
        self.__balance=balance
        self.name=name
        self.withdraw=withdraw
        self.deposit=deposit
        
    def Deposit(self):
        self.__balance+=self.deposit
    def Withdraw(self):
        if (self.__balance - self.withdraw>0):
            self.__balance-=self.withdraw
        else:
            print("your balance is insuffcient for this withdraw")
    def get_balance(self):
        self.Deposit()
        self.Withdraw()
        return self.__balance
        
    

account1=BankAccount("daniel ".upper(),999999999999999999999,1,0)
account2=BankAccount("habatamu ".upper(),5000,0,6000)

print(account1.get_balance())
print(account2.get_balance())























        



