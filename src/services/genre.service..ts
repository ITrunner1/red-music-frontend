import instance from "@/store/api/api.interceptor"
import { TypeDataFilters, TypePagination } from "@/interfaces/pagination.type"
import { IBase } from "@/interfaces/base.iterface"

export interface IGenre extends IBase {
    name: string,
    slug: string
}

export const GENRES = 'genres'

export const GenreService = {
    async getAll() {
        return instance<IGenre[]>({
            url: `/${GENRES}`,
            method: 'GET',            
        })
    },

    async getById(id: string | number) {
        return instance<IGenre[]>({
            url: `/${GENRES}/${id}`,
            method: 'GET',            
        })
    },

    async getBySlug(slug: string) {
        return instance<IGenre[]>({
            url: `/${GENRES}/${slug}`,
            method: 'GET',            
        })
    },

    async create() {
        return instance<IGenre[]>({
            url: `/${GENRES}`,
            method: 'POST',
        })       
    },

    async update(id: number | string, name: string) {
        return instance<IGenre[]>({
            url: `/${GENRES}/${id}`,
            method: 'PUT',
            data: {name}
        })       
    },

    async delete(id: number | string) {
        return instance<IGenre[]>({
            url: `/${GENRES}/${id}`,
            method: 'DELETE',
        })       
    },
}

