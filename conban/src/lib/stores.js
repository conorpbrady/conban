import { writable } from 'svelte/store';
const initObj = [
    {
      "name": "Board 1",
      "lists": [
        {
          "name": "List 1",
          "notes": [
            "Note 1",
            "Note 2"
          ]
        },
        {
          "name": "List 2",
          "notes": []
        }
      ]
    }
  ];

export const boards = writable(initObj);
export const activeBoardId = writable(0);
