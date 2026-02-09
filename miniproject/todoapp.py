import json
import os




class Task:
    def __init__(self, task_id: int, title: str, completed: bool = False):
        self.id = task_id
        self.title = title
        self.completed = completed

    def mark_done(self):
        self.completed = True

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "completed": self.completed
        }

    @staticmethod
    def from_dict(data):
        return Task(data["id"], data["title"], data["completed"])





class Storage:
    def __init__(self, filename="tasks.json"):
        self.filename = filename

    def load(self):
        if not os.path.exists(self.filename):
            return []

        with open(self.filename, "r") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                return []

        return [Task.from_dict(item) for item in data]

    def save(self, tasks):
        with open(self.filename, "w") as f:
            json.dump([t.to_dict() for t in tasks], f, indent=4)


class TaskManager:
    def __init__(self, storage: Storage):
        self.storage = storage
        self.tasks = self.storage.load()
        self.next_id = self._get_next_id()

    def _get_next_id(self):
        if not self.tasks:
            return 1
        return max(t.id for t in self.tasks) + 1

    def add_task(self, title):
        task = Task(self.next_id, title)
        self.tasks.append(task)
        self.next_id += 1
        self.storage.save(self.tasks)

    def list_tasks(self):
        return self.tasks

    def delete_task(self, task_id):
        self.tasks = [t for t in self.tasks if t.id != task_id]
        self.storage.save(self.tasks)

    def mark_done(self, task_id):
        for task in self.tasks:
            if task.id == task_id:
                task.mark_done()
                break
        self.storage.save(self.tasks)


def print_tasks(tasks):
    if not tasks:
        print("No tasks yet.")
        return

    for task in tasks:
        status = "✓" if task.completed else " "
        print(f"[{status}] {task.id}. {task.title}")


def main():
    storage = Storage()
    manager = TaskManager(storage)

    print("Simple CLI Todo App")
    print("Commands: add <task>, list, done <id>, delete <id>, exit")

    while True:
        command = input("\n> ").strip()

        if command.startswith("add "):
            title = command[4:]
            manager.add_task(title)
            print("Task added.")

        elif command == "list":
            print_tasks(manager.list_tasks())

        elif command.startswith("done "):
            task_id = int(command.split()[1])
            manager.mark_done(task_id)
            print("Task completed.")

        elif command.startswith("delete "):
            task_id = int(command.split()[1])
            manager.delete_task(task_id)
            print("Task deleted.")

        elif command == "exit":
            print("Goodbye.")
            break

        else:
            print("Unknown command.")


if __name__ == "__main__":
    main()
