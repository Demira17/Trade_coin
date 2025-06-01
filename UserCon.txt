import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { UserBalance } from '../entity/UserBalance'
import { CoinPackage } from '../entity/CoinPackage'

const balRepo = () => AppDataSource.getRepository(UserBalance)
const packRepo = () => AppDataSource.getRepository(CoinPackage)

export async function getBalance(_req: Request, res: Response, next: NextFunction) {
    try {
        let ub = await balRepo().findOneBy({ id: 1 })
        if (!ub) {
            ub = balRepo().create({ balance: 0 })
            await balRepo().save(ub)
        }
        res.json({
            balance: ub.balance,
            cardNumber: ub.cardNumber || null,
            cardHolderName: ub.cardHolderName || null,
            cardCountry: ub.cardCountry || null
        })
    } catch (e) {
        next(e)
    }
}

export async function purchase(req: Request, res: Response, next: NextFunction) {
    try {
        const { packageId, cardNumber, cardHolderName, cardCountry, saveCard } = req.body
        const pkg = await packRepo().findOneBy({ id: packageId })
        if (!pkg) return res.status(404).json({ message: 'Package not found' })

        const bonus = Math.floor((pkg.amount * pkg.bonusPercent) / 100)
        const total = pkg.amount + bonus

        let ub = await balRepo().findOneBy({ id: 1 })
        if (!ub) {
            ub = balRepo().create({ balance: total })
        } else {
            ub.balance += total
        }

        if (saveCard && cardNumber) {
            ub.cardNumber = cardNumber
            ub.cardHolderName = cardHolderName
            ub.cardCountry = cardCountry
        }

        await balRepo().save(ub)
        res.json({
            newBalance: ub.balance,
            cardNumber: ub.cardNumber || null,
            cardHolderName: ub.cardHolderName || null,
            cardCountry: ub.cardCountry || null
        })
    } catch (e) {
        next(e)
    }
}
