import { createContext, useCallback, useContext, useRef, useState, } from 'react';
import { useLockFn } from '@/hooks/use-lock-fn';
const BlockContext = createContext(null);
export const useBlockTaskContext = () => {
    const context = useContext(BlockContext);
    if (!context) {
        throw new Error('useBlockContext must be used within a BlockProvider');
    }
    return context;
};
export const useBlockTask = (key, fn) => {
    const { run, tasks } = useBlockTaskContext();
    const execute = useLockFn(async () => {
        return await run(key, fn);
    });
    return {
        execute,
        isPending: tasks[key]?.status === 'pending',
        isSuccess: tasks[key]?.status === 'success',
        isError: tasks[key]?.status === 'error',
        data: tasks[key]?.data,
        error: tasks[key]?.error,
    };
};
export const BlockTaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});
    const tasksRef = useRef({});
    const run = useCallback(async (key, fn) => {
        const task = {
            id: key,
            status: 'pending',
            startTime: Date.now(),
        };
        setTasks((prev) => ({ ...prev, [key]: task }));
        tasksRef.current[key] = task;
        try {
            const data = await fn();
            const successTask = {
                ...task,
                status: 'success',
                data,
                endTime: Date.now(),
            };
            setTasks((prev) => ({
                ...prev,
                [key]: successTask,
            }));
            tasksRef.current[key] = successTask;
            return data;
        }
        catch (error) {
            const errorTask = {
                ...task,
                status: 'error',
                error: error instanceof Error ? error : new Error(String(error)),
                endTime: Date.now(),
            };
            setTasks((prev) => ({
                ...prev,
                [key]: errorTask,
            }));
            tasksRef.current[key] = errorTask;
            throw error;
        }
    }, []);
    const getTask = useCallback((key) => tasks[key], [tasks]);
    const clearTask = useCallback((key) => {
        setTasks((prev) => {
            const newTasks = { ...prev };
            delete newTasks[key];
            return newTasks;
        });
        delete tasksRef.current[key];
    }, []);
    return (<BlockContext.Provider value={{
            tasks,
            run,
            getTask,
            clearTask,
        }}>
      {children}
    </BlockContext.Provider>);
};
