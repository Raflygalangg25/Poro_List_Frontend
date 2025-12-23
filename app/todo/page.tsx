"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";
//import { headers } from "next/headers";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoList() {
  const [activeTab, setActiveTab] = useState<"pomodoro" | "todo">("todo");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [deleteAllType, setDeleteAllType] = useState<"ongoing" | "completed">(
    "ongoing"
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [user, setUser] = useState<{name: string, profile_pic: string} | null>(null);

  useEffect(() => {
    fetch("https://porolistbackend-production.up.railway.app/tasks")
    .then(response =>response.json())
    .then(data => setTasks(data))
    .catch(error => console.error("Error mengambil data:", error));
    
    const savedUser = localStorage.getItem('poro_user');
    if (savedUser) {
      try{
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Gagal memproses data user dari storage:", error);
      }
    }
  }, []);

  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState({
    id: 0,
    title: "",
    description: "",
  });

  const ongoingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleAddTask = async () => {
    if (newTask.title.trim()) {
      try{
        const response = await fetch(`https://porolistbackend-production.up.railway.app/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTask.title,
            description: newTask.description
          }),
        });

        if(response.ok){
          const result = await response.json();

          const taskBaru: Task = {
            id: result.id,
            title: newTask.title,
            description: newTask.description,
            completed: false
          };

          setTasks([...tasks, taskBaru]);
          setNewTask({ title: "", description: ""});
          setShowAddModal(false);
        }

      } catch (error){
        console.error("Gagal menambah tugas:", error);
      }
      /*
      setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
      setNewTask({ title: "", description: "" });
      setShowAddModal(false);**/
    }
  };

  const handleEditTask = async () => {
    if (editTask.title.trim()) {
      try{
        const response = await fetch(`https://porolistbackend-production.up.railway.app/tasks/${editTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editTask.title,
            description: editTask.description
          }),
        });
        if (response.ok) {
          setTasks(
        tasks.map((task) =>
          task.id === editTask.id
            ? {
                ...task,
                title: editTask.title,
                description: editTask.description,
              }
            : task
        )
      );
      setShowEditModal(false);
      alert("Tugas berhasil diUpdate!");

        } else {
          const errorData = await response.json();
          alert(`Gagal: ${errorData.error || "Terjadi kesalahan"}`);
        }
      } catch (error){
        console.error("Gagal Update tugas:", error);
        alert("Gagal menghubungi server");
      }
    }
  };

  const handleDeleteTask = async () => {
    console.log("Fungsi Delete berhasil");
    console.log("Tugas yang mau dihapus", selectedTask);

    if (!selectedTask || !selectedTask.id) {
      alert("Error: ID tidak valid!");
      console.error("Selected Task:", selectedTask);
      return;
    }

    console.log("Mengirim Delete ke:", `https://porolistbackend-production.up.railway.app/tasks/${selectedTask.id}`);

      try{
        console.log("sedang mengirim ke BE");
        const response = await fetch(`https://porolistbackend-production.up.railway.app/tasks/${selectedTask.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== selectedTask.id));
        setShowDeleteModal(false);
        setSelectedTask(null);
        alert("Tugas berhasil dihapus!");
        } else {
          console.error("BE menolak hapus tugas")
        }
      } catch (error) {
        console.error("Gagal menghapus tugas:", error);
      }

      /*
      setTasks(tasks.filter((task) => task.id !== selectedTask.id));
      setShowDeleteModal(false);
      setSelectedTask(null); **/
  }

  const handleDeleteAll = async () => {
    const tasksToDelete = deleteAllType === "ongoing"
    ? tasks.filter((task) => !task.completed)
    : tasks.filter((task) => task.completed);

    for (const task of tasksToDelete) {
      try{
        await fetch(`https://porolistbackend-production.up.railway.app/tasks/${task.id}`, { method: 'DELETE'});
      } catch (error) {
        console.error(`Gagal menghapus tugas ${task.id}`, error);
      }
    }
    
    if (deleteAllType === "ongoing") {
      setTasks(tasks.filter((task) => task.completed));
    } else {
      setTasks(tasks.filter((task) => !task.completed));
    }
    setShowDeleteAllModal(false);
  };

  const handleToggleComplete = async (id: number) => {
    const taskTarget = tasks.find(t => t.id == id);
    if (!taskTarget) return;

    try{
      await fetch(`https://porolistbackend-production.up.railway.app/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !taskTarget.completed})
      });

      setTasks(
        tasks.map((task) => 
        task.id == id? { ...task, completed: !task.completed} : task
      )
      );

    } catch (error) {
      console.error("Gagal update tugas:", error);
    }

    /*
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ) 
    ); */
  };

  const openEditModal = (task: Task) => {
    setEditTask({
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const openDeleteAllModal = (type: "ongoing" | "completed") => {
    setDeleteAllType(type);
    setShowDeleteAllModal(true);
  };

  const openDetailModal = (task: Task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  return (
    <div
      className={`min-h-screen bg-[#113F67] p-2 sm:p-4 pb-8 relative transition-all duration-300 ${
        isSidebarOpen ? "md:ml-[320px]" : "ml-0"
      }`}
    >
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} />

      {/* Navbar Component */}
      <Navbar
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onTabChange={setActiveTab}
      />

      {/* Main Content - Responsive */}
      <div className="max-w-[1197px] mx-auto space-y-4 sm:space-y-6">
        {/* Ongoing Tasks Section */}
        <div>
          <h2 className="text-white font-[family-name:var(--font-baloo-da)] text-[28px] sm:text-[36px] md:text-[40px] font-normal mb-3 sm:mb-4 leading-tight">
            Ongoing Tasks
          </h2>
          <div className="bg-[#58A0C8] rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 md:p-8 relative">
            <div className="space-y-3 sm:space-y-4 pr-0 lg:pr-20">
              {ongoingTasks.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-white font-[family-name:var(--font-quicksand)] text-[48px] font-bold leading-[100%] tracking-[0%] opacity-20">
                    Add a new task here
                  </p>
                </div>
              ) : (
                ongoingTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => openEditModal(task)}
                    onDelete={() => openDeleteModal(task)}
                    onToggleComplete={() => handleToggleComplete(task.id)}
                    onClick={() => openDetailModal(task)}
                  />
                ))
              )}
            </div>

            {/* Action Buttons - Responsive positioning */}
            <div className="flex gap-3 sm:gap-4 mt-4 lg:mt-0 lg:flex-col lg:absolute lg:top-6 xl:top-8 lg:right-6 xl:right-8">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex-1 lg:flex-none w-full lg:w-[60px] xl:w-[70px] h-[50px] sm:h-[56px] lg:h-[60px] xl:h-[70px] bg-[#34699A] hover:bg-[#2A5580] rounded-[15px] sm:rounded-[20px] flex items-center justify-center transition-colors shadow-lg"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
              {ongoingTasks.length > 0 && (
                <button
                  onClick={() => openDeleteAllModal("ongoing")}
                  className="flex-1 lg:flex-none w-full lg:w-[60px] xl:w-[70px] h-[50px] sm:h-[56px] lg:h-[60px] xl:h-[70px] bg-[#34699A] hover:bg-[#2A5580] rounded-[15px] sm:rounded-[20px] flex items-center justify-center transition-colors shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="white"
                    className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px] xl:w-[32px] xl:h-[32px]"
                  >
                    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Completed Tasks Section */}
        <div>
          <h2 className="text-white font-[family-name:var(--font-baloo-da)] text-[28px] sm:text-[36px] md:text-[40px] font-normal mb-3 sm:mb-4 leading-tight">
            Completed Tasks
          </h2>
          <div className="bg-[#58A0C8] rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 md:p-8 relative">
            <div className="space-y-3 sm:space-y-4 pr-0 lg:pr-20">
              {completedTasks.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-white font-[family-name:var(--font-quicksand)] text-[48px] font-bold leading-[100%] tracking-[0%] opacity-20">
                    There are no completed tasks yet
                  </p>
                </div>
              ) : (
                completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => openEditModal(task)}
                    onDelete={() => openDeleteModal(task)}
                    onToggleComplete={() => handleToggleComplete(task.id)}
                    onClick={() => openDetailModal(task)}
                  />
                ))
              )}
            </div>

            {/* Delete All Button - Responsive */}
            {completedTasks.length > 0 && (
              <div className="mt-4 lg:mt-0 lg:absolute lg:top-6 xl:top-8 lg:right-6 xl:right-8">
                <button
                  onClick={() => openDeleteAllModal("completed")}
                  className="w-full lg:w-[60px] xl:w-[70px] h-[50px] sm:h-[56px] lg:h-[60px] xl:h-[70px] bg-[#34699A] hover:bg-[#2A5580] rounded-[15px] sm:rounded-[20px] flex items-center justify-center transition-colors shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="white"
                    className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px] xl:w-[32px] xl:h-[32px]"
                  >
                    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <TaskModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setNewTask({ title: "", description: "" });
        }}
        onConfirm={handleAddTask}
        title="Add New Task"
        taskTitle={newTask.title}
        taskDescription={newTask.description}
        onTitleChange={(value) => setNewTask({ ...newTask, title: value })}
        onDescriptionChange={(value) =>
          setNewTask({ ...newTask, description: value })
        }
        confirmButtonText="Add Task"
      />

      {/* Edit Task Modal */}
      <TaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onConfirm={handleEditTask}
        title="Edit Task"
        taskTitle={editTask.title}
        taskDescription={editTask.description}
        onTitleChange={(value) => setEditTask({ ...editTask, title: value })}
        onDescriptionChange={(value) =>
          setEditTask({ ...editTask, description: value })
        }
        confirmButtonText="Save Changes"
      />

      {/* Delete Task Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal && selectedTask !== null}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTask(null);
        }}
        onConfirm={handleDeleteTask}
        title="Are you sure?"
        message={
          selectedTask
            ? `Do you really want to delete "${selectedTask.title}"? This process cannot be undone.`
            : ""
        }
      />

      {/* Delete All Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleDeleteAll}
        title="Are you sure?"
        message={`Do you really want to delete all ${
          deleteAllType === "ongoing" ? "ongoing" : "completed"
        } tasks? This process cannot be undone.`}
      />

      {/* Task Detail Modal */}
      <TaskModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedTask(null);
        }}
        taskTitle={selectedTask?.title || ""}
        taskDescription={selectedTask?.description || ""}
        isReadOnly={true}
        taskCompleted={selectedTask?.completed}
      />
    </div>
  );
}
