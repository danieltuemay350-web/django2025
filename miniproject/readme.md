
# CLI Todo App

A simple command line todo app written in Python.
Tasks are saved to a local JSON file so they persist after you close the program.

---

## Requirements

- Python 3 installed

Check:
```

python --version

```

---

## Setup

1. Download or clone the project
```

git clone <your-repo-url>

```

2. Go into the project folder
```

cd cli-todo-app

```

3. Make sure `tasks.json` exists  
If not, create it and put:
```

[]

```

---

## Run the app

```

python todo.py

```

(or `python3 todo.py` if needed)

---

## Commands

Add a task
```

add Buy milk

```

List tasks
```

list

```

Mark task done
```

done 1

```

Delete task
```

delete 1

```

Exit
```

exit

```

---

## Example

```

> add Study Python
> list
> [ ] 1. Study Python
> done 1
> list
> [✓] 1. Study Python

```