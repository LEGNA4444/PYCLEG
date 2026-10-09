import time
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class GitAutoPushHandler(FileSystemEventHandler):
    def __init__(self):
        self.last_push = 0

    def on_modified(self, event):
        if ".git" in event.src_path or "auto_push.py" in event.src_path:
            return

        current_time = time.time()
        if current_time - self.last_push < 3:
            return
        
        self.last_push = current_time
        print("\n[Guardia] Cambio detectado. Subiendo a GitHub...")

        try:
            subprocess.run(["git", "add", "."], check=True)
            subprocess.run(["git", "commit", "-m", "Auto-update desde script"], check=True)
            subprocess.run(["git", "push"], check=True)
            print("[Guardia] Cambios subidos con éxito.\n")
        except subprocess.CalledProcessError:
            print("[Guardia] Sin cambios nuevos para subir.\n")

if __name__ == "__main__":
    event_handler = GitAutoPushHandler()
    observer = Observer()
    observer.schedule(event_handler, path=".", recursive=True)
    observer.start()
    print("[Guardia] Escuchando cambios... Presiona Ctrl+C para detener.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
# Simon soy huevona