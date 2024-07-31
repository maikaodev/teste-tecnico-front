import { ResponseProps, User, FormattedUser } from '../types';

import axiosInstance from '../utils/axios';

import { v4 as uuidv4 } from 'uuid';

class UserController {
  total_pages: number;
  formattedListOfUSers: FormattedUser[];
  paginatedUsers: FormattedUser[][];

  constructor() {
    this.total_pages = 0;
    this.formattedListOfUSers = [];
    this.paginatedUsers = [];
  }

  formatterUser(newUser: User): FormattedUser {
    const newUserFormatted: FormattedUser = {
      id: uuidv4(),
      email: newUser.email,
      full_name: `${newUser.first_name} ${newUser.last_name}`,
      avatar: newUser.avatar,
    };

    return newUserFormatted;
  }

  saveThisInLocalStorage(listOfUser: FormattedUser[]) {
    try {
      localStorage.setItem('usersData', JSON.stringify(listOfUser));
    } catch (error) {
      alert('Ocorreu algum problema para salvar os dados;');
    }
  }

  async fetchAllUsers() {
    try {
      let response = await axiosInstance.get<ResponseProps>('/users?page=1');

      let data: User[] = [];

      if (response.data.data.length > 0) {
        const total_pages = response.data.total_pages;

        data = response.data.data;

        for (let page = 2; page <= total_pages; page++) {
          const pageResponse = await axiosInstance.get<ResponseProps>(
            `/users?page=${page}`,
          );
          if (pageResponse && pageResponse.data.data.length > 0) {
            data.push(...pageResponse.data.data);
          }
        }

        for (const user of data) {
          const formattedUser = this.formatterUser(user);
          this.formattedListOfUSers.push(formattedUser);
        }

        this.paginateArray(this.formattedListOfUSers);
      }
    } catch (error: any) {
      console.error('Failed to fetch users:', error.message);
      return null;
    }
  }

  createNewUSer(user: User) {
    const storedUsers = localStorage.getItem('usersData');

    const newUser: FormattedUser = this.formatterUser(user);
    let storedData: FormattedUser[] = [];

    if (storedUsers) {
      const storedUsersParsed = JSON.parse(storedUsers) as FormattedUser[];

      storedUsersParsed.forEach((user) => {
        if (user.id === newUser.id) {
          return alert('Ops, aconteceu algo inesperado!');
        }

        storedData.push(user);
      });

      this.formattedListOfUSers = [...storedData, newUser];
      this.saveThisInLocalStorage(this.formattedListOfUSers);
    }
  }

  updateUser(id: number, updatedUser: FormattedUser) {
    const userIndex = this.formattedListOfUSers.findIndex(
      (user) => user.id === id,
    );

    if (userIndex >= 0) {
      this.formattedListOfUSers[userIndex] = updatedUser;
      return true;
    }

    return false;
  }

  deleteUser(id: number) {
    const userIndex = this.formattedListOfUSers.findIndex(
      (user) => user.id === id,
    );

    if (userIndex >= 0) {
      this.formattedListOfUSers.splice(userIndex, 1);
      return true;
    }

    return false;
  }

  paginateArray(array: FormattedUser[]) {
    const paginatedArray: FormattedUser[][] = [];

    for (let i = 0; i < array.length; i += 8) {
      paginatedArray.push(array.slice(i, i + 8));
    }

    this.total_pages = paginatedArray.length;

    this.paginatedUsers = paginatedArray;
  }
}

export default UserController;

