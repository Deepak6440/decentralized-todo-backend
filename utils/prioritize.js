const prioritizeTasks = (tasks, prompt) => {
    if (!Array.isArray(tasks)) {
      throw new Error("Tasks must be an array.");
    }
  
    const today = new Date();
    const normalizedPrompt = (prompt || "").toLowerCase();
  
    const sortedTasks = tasks
      .filter(task => task.deadline && !isNaN(new Date(task.deadline).getTime()))
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  
    if (sortedTasks.length === 0) {
      return "No valid tasks to prioritize.";
    }
  
    if (normalizedPrompt.includes("what should i do first")) {
      return `You should focus on: "${sortedTasks[0].title}" (Due: ${sortedTasks[0].deadline})`;
    }
  
    if (normalizedPrompt.includes("is there any overdue task")) {
      const overdueTasks = sortedTasks.filter(task => new Date(task.deadline) < today);
      return overdueTasks.length > 0
        ? `Overdue tasks:\n${overdueTasks.map(task => `"${task.title}" (Due: ${task.deadline})`).join("\n")}`
        : "You have no overdue tasks. Keep up the good work!";
    }
  
    if (normalizedPrompt.includes("prioritize my tasks")) {
      return `Here are your tasks in order of priority:\n${sortedTasks
        .map(task => `"${task.title}" (Due: ${task.deadline})`)
        .join("\n")}`;
    }
  
    return `I couldn't understand your request. Try asking:
    - "What should I do first?"
    - "Is there any overdue task?"
    - "Prioritize my tasks."`;
  };
  
  
  
  module.exports = prioritizeTasks;
  