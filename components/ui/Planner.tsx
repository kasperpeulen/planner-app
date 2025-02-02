/**
 * v0 by Vercel.
 * @see https://v0.dev/t/D8PjgC94xmy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { format } from 'date-fns';
import type { User } from '@/app/actions/user';
import type { Event } from '@/app/actions/events';
import { CirclePicker } from 'react-color';

import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Button } from './button';
import { Calendar } from './calendar';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './dialog';
import { Label } from './label';
import { Input } from './input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from './table';
import { createEvent } from '@/app/actions/events';

export default function Planner({
  currentDate = new Date(),
  user,
  events,
}: {
  currentDate: Date;
  user: User;
  events: Event[];
}) {
  const [userEvents, setEvents] = useState<Event[]>(events);

  let data = [
    ['7:00', '7:00'],
    ['7:30', '7:30'],
    ['8:00', '8:00'],
    ['8:30', '8:30'],
    ['9:00', '9:00'],
    ['9:30', '9:30'],
    ['10:00', '10:00'],
    ['10:30', '10:30'],
    ['11:00', '11:00'],
    ['11:30', '11:30'],
    ['12:00', '12:00'],
    ['12:30', '12:30'],
    ['1:00', '13:00'],
    ['1:30', '13:30'],
    ['2:00', '14:00'],
    ['2:30', '14:30'],
    ['3:00', '15:00'],
    ['3:30', '15:30'],
    ['4:00', '16:00'],
    ['4:30', '16:30'],
    ['5:00', '17:00'],
    ['5:30', '17:30'],
    ['6:00', '18:00'],
    ['6:30', '18:30'],
    ['7:00', '19:00'],
    ['7:30', '19:30'],
    ['8:00', '20:00'],
  ];
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const [newEvent, setNewEvent] = useState<Event>({
    id: '',
    title: '',
    startAt: new Date(Date.now() - tzoffset),
    endAt: new Date(Date.now() - tzoffset),
    recurrence: 'weekly',
    daysOfWeek: [],
    daysOfMonth: [],
    userId: user?.user.id,
    user: { email: user?.user.email },
    color: '#2196f3',
  });

  newEvent.startAt.setSeconds(0);
  newEvent.startAt.setMilliseconds(0);
  newEvent.endAt.setSeconds(0);
  newEvent.endAt.setMilliseconds(0);

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  const handleAddEvent = async () => {
    setEvents([...userEvents, newEvent]);
    setNewEvent({
      title: newEvent.title,
      startAt: newEvent.startAt,
      endAt: newEvent.endAt,
      recurrence: newEvent.recurrence,
      daysOfWeek: [],
      daysOfMonth: [],
      userId: user?.user.id,
      color: newEvent.color,
    });
    await createEvent(newEvent, user.user);
    setIsAddEventModalOpen(false);
  };
  // TODO: Add delete event functionality
  // const handleDeleteEvent = (id: string) => {
  //   setEvents(events.filter((event) => event.id !== id));
  // };
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <NextLink href="/">Home</NextLink>
        </h1>
        <div className="flex items-center gap-4">
          <NextLink href="/print">Print</NextLink>
          <Popover>
            <PopoverTrigger>
              <Button size="sm">
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                {format(selectedDate, 'MMM d, yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                required={true}
              />
            </PopoverContent>
          </Popover>
          <Dialog
            open={isAddEventModalOpen}
            onOpenChange={setIsAddEventModalOpen}
          >
            <DialogTrigger>
              <Button size="sm" onClick={() => setIsAddEventModalOpen(true)}>
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Event</DialogTitle>
                <DialogDescription>
                  Fill out the details for your new event.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="start" className="text-right">
                    Start
                  </Label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={newEvent.startAt?.toISOString().slice(0, -1)}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        startAt: new Date(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                  <input
                    type="hidden"
                    id="timezone"
                    name="timezone"
                    value="-06:00"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="end" className="text-right">
                    End
                  </Label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={newEvent.endAt?.toISOString().slice(0, -1)}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        endAt: new Date(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="recurrence" className="text-right">
                    Recurrence
                  </Label>
                  <Select
                    value={newEvent.recurrence}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, recurrence: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recurrence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="color" className="text-right">
                    Color
                  </Label>
                  <CirclePicker
                    colors={[
                      '#f44336',
                      '#9c27b0',
                      '#2196f3',
                      '#4caf50',
                      '#ffeb3b',
                      '#ffc107',
                      '#ff9800',
                      '#795548',
                    ]}
                    onChangeComplete={(value: any) =>
                      setNewEvent({ ...newEvent, color: value.hex })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddEventModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="flex-1">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead>Events</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((value) => (
              <TableRow key={value[1]}>
                <TableCell className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                  {`${value[0]} ${parseInt(value[1], 10) < 12 ? 'AM' : 'PM'}`}
                </TableCell>
                <TableCell>
                  <div className="grid grid-cols-1">
                    {userEvents
                      .filter((event) => {
                        const eventStart = new Date(event.startAt);
                        const eventStartTime = `${event.startAt.getHours()}:${
                          event.startAt.getMinutes() === 30
                            ? event.startAt.getMinutes()
                            : event.startAt.getMinutes() + '0'
                        }`;
                        const eventEnd = new Date(event.endAt);
                        const formattedEventDate = `${eventStart.getDate()}-${eventStart.getMonth()}-${eventStart.getFullYear()}`;
                        const formattedSelectedDate = `${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`;

                        // Convert the time to the correct format
                        const eventHour = parseInt(value[1].split(':')[0]);
                        const eventMinute = parseInt(value[1].split(':')[1]);
                        const plannerCellTime = `${eventHour}:${
                          eventMinute === 30 ? eventMinute : eventMinute + '0'
                        }`;
                        return (
                          eventStartTime === plannerCellTime &&
                          // eventTime < eventEnd &&
                          formattedEventDate === formattedSelectedDate
                        );
                      })
                      .map((event) => (
                        <div
                          key={event.id}
                          className="bg-blue-500 text-white rounded-lg p-1 text-xs"
                          style={{ backgroundColor: event.color }}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
