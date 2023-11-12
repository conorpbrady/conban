import { writable } from 'svelte/store';
const basicObj = [
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

const initObj = localStorage.getItem("boardData")
const boardObj = JSON.parse(initObj);
export const boards = writable(boardObj);
boards.subscribe(value => {
 localStorage.setItem("boardData", JSON.stringify(value));
});
export const activeBoardId = writable(0);

