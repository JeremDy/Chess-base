<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180914155817 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE stats (id INT AUTO_INCREMENT NOT NULL, player_id INT NOT NULL, nb_win INT NOT NULL, nb_game INT NOT NULL, nb_lose INT NOT NULL, nb_surrender INT NOT NULL, total_time TIME DEFAULT NULL, UNIQUE INDEX UNIQ_574767AA99E6F5DF (player_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE player_in_game (id INT AUTO_INCREMENT NOT NULL, player_id INT DEFAULT NULL, opponent_id INT DEFAULT NULL, game_id INT NOT NULL, last_move_time DATETIME DEFAULT NULL, last_move VARCHAR(255) DEFAULT NULL, allow_to_move TINYINT(1) NOT NULL, color VARCHAR(10) NOT NULL, INDEX IDX_6864F1AD99E6F5DF (player_id), INDEX IDX_6864F1AD7F656CDC (opponent_id), INDEX IDX_6864F1ADE48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', UNIQUE INDEX UNIQ_8D93D64992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_8D93D649A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_8D93D649C05FB297 (confirmation_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game_over (id INT AUTO_INCREMENT NOT NULL, opponent_id INT DEFAULT NULL, movement_list LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', duration TIME DEFAULT NULL, is_winner TINYINT(1) NOT NULL, INDEX IDX_5FE9CF757F656CDC (opponent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, movement_list LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', started_at DATETIME NOT NULL, chess_board LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', ended_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE stats ADD CONSTRAINT FK_574767AA99E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1AD99E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1AD7F656CDC FOREIGN KEY (opponent_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1ADE48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('ALTER TABLE game_over ADD CONSTRAINT FK_5FE9CF757F656CDC FOREIGN KEY (opponent_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE stats DROP FOREIGN KEY FK_574767AA99E6F5DF');
        $this->addSql('ALTER TABLE player_in_game DROP FOREIGN KEY FK_6864F1AD99E6F5DF');
        $this->addSql('ALTER TABLE player_in_game DROP FOREIGN KEY FK_6864F1AD7F656CDC');
        $this->addSql('ALTER TABLE game_over DROP FOREIGN KEY FK_5FE9CF757F656CDC');
        $this->addSql('ALTER TABLE player_in_game DROP FOREIGN KEY FK_6864F1ADE48FD905');
        $this->addSql('DROP TABLE stats');
        $this->addSql('DROP TABLE player_in_game');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE game_over');
        $this->addSql('DROP TABLE game');
    }
}
