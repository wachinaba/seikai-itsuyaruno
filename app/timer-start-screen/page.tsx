"use client";
import Image from "next/image";
import styles from "./TimerStartScreen.module.css";
import NavigateTaskButton from "@/components/NavigateTaskButton";
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import { User, Task } from '@/lib/entity';
import { getUser, getTask } from '@/lib/db_api_wrapper';
import { useState, useEffect } from 'react';
import { NextAuthProvider, WithLoggedIn } from "@/app/provider";

export default function TimerStartScreen() {
  const [user, setUser] = useState<User | undefined>();
  const [currentTask, setCurrentTask] = useState<Task | undefined>();

  useEffect(() => {
    getUser()
      .then((user) => {
        setUser(user);
        if (user.current_task) {
          getTask(user.current_task)
            .then((task) => {
              setCurrentTask(task);
            })
        }
      });
  }, []);

  return (
    <NextAuthProvider>
      <WithLoggedIn>
        <main className={styles.main}>
          <Header />
          <div className={styles.TaskTextComponets}>
            <ProgressBar task={currentTask} isTask={true} progress={10} />
          </div>
          <div className={styles.NavigateTaskButton}>
            <NavigateTaskButton />
          </div>
        </main>
      </WithLoggedIn>
    </NextAuthProvider>
  );
}