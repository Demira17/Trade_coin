import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { CoinPackage } from '../entity/CoinPackage';

const repo = () => AppDataSource.getRepository(CoinPackage);

export async function getAll(_req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await repo().find());
    } catch (e) { next(e); }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await repo().findOneBy({ id: +req.params.id }));
    } catch (e) { next(e); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const newPack = repo().create(req.body);
        res.status(201).json(await repo().save(newPack));
    } catch (e) { next(e); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        await repo().update(+req.params.id, req.body);
        res.json(await repo().findOneBy({ id: +req.params.id }));
    } catch (e) { next(e); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        await repo().delete(+req.params.id);
        res.sendStatus(204);
    } catch (e) { next(e); }
}