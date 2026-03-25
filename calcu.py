while True:

    
        opp= input("""enter the opration type or use symbols :
        1) for addtion use 'add'or '+'
        2) for substruction 'sub' or '-'
        3) for multiplication 'mult' or '*'
        4) for division use 'div' or '/'
        5) to know the remainder 'rem' or '%'
        6)  to use power function 'pow' or '^'

        """)
        opp = opp.upper()
        if opp == 'DIV' or opp == '/' or opp =='REM' or opp =='%':
            x = int(input('enter the nomineter :'))
            y = int(input('enter the denomineter :'))
        elif opp=='POW' or opp=='^':
            x=int(input('enter the number: '))
            y=float(input('enter the exponent :'))
        else:
            x= int(input(' enter the first number :'))
            y= int(input(' enter the second number :'))


        result = ''
        def opration():
            
            if opp == 'ADD' or opp== '+':
                result = x+y
            elif opp == 'SUB' or opp == '-':
                result = x - y
            elif opp == 'MULT' or opp == '*':
                result = x * y
            elif opp == 'DIV' or opp =='/':
                result = x/y
            elif opp=='REM' or opp== '%':
                  result = x % y
            elif opp== 'POW' or opp=='^':
                result=x**y
           
            return result
        print(opration())

