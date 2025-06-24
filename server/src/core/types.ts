export interface Payout{
    amount: number;
    status: "pending" | "done";
    date: Date;
    user: string; // User ID
}