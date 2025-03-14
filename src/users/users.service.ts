import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Xuan Phuc",
            "email": "xuanphuctran269@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Linh Nguyen",
            "email": "linhnguyen@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Bao Tran",
            "email": "baotran@example.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Minh Hoang",
            "email": "minhhoang@example.com",
            "role": "ADMIN"
        },
        {
            "id": 5,
            "name": "Hanh Le",
            "email": "hanhle@example.com",
            "role": "ENGINEER"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        return user
    }

    create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)

        return newUser
    }

    update(id: number, updateUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map(user => {
            if (user.id == id) {
                return { ...user, ...updateUser }
            }

            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id) 

        return removedUser
    }
}
