export interface LeaderboardUser {
    id: string;
    username: string;
    xp: number;
    level: number;
    avatar_url: string;
    weekly_xp: number;
    rank: number;
    created_at: string;
    updated_at: string;
}

export interface Database {
    public: {
        Tables: {
            leaderboard_users: {
                Row: LeaderboardUser;
                Insert: Omit<LeaderboardUser, 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Omit<LeaderboardUser, 'id' | 'created_at' | 'updated_at'>>;
            };
        };
    };
}
