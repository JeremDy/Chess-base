<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180920175842 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sessions (sess_id VARCHAR(128) NOT NULL COLLATE utf8_bin, sess_data BLOB NOT NULL, sess_time INT UNSIGNED NOT NULL, sess_lifetime INT NOT NULL, PRIMARY KEY(sess_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, player_one_id INT DEFAULT NULL, player_two_id INT DEFAULT NULL, player_who_can_play_id INT DEFAULT NULL, chess_board LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', movement_list LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', started_at DATETIME NOT NULL, last_move VARCHAR(50) DEFAULT NULL, last_move_time DATETIME DEFAULT NULL, INDEX IDX_232B318C649A58CD (player_one_id), INDEX IDX_232B318CFC6BF02 (player_two_id), INDEX IDX_232B318C1CF398FB (player_who_can_play_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stats (id INT AUTO_INCREMENT NOT NULL, player_id INT NOT NULL, nb_win INT NOT NULL, nb_game INT NOT NULL, nb_lose INT NOT NULL, nb_surrender INT NOT NULL, total_time TIME DEFAULT NULL, UNIQUE INDEX UNIQ_574767AA99E6F5DF (player_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', facebook_id VARCHAR(255) DEFAULT NULL, facebook_access_token VARCHAR(255) DEFAULT NULL, google_id VARCHAR(255) DEFAULT NULL, google_access_token VARCHAR(255) DEFAULT NULL, profile_picture VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D64992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_8D93D649A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_8D93D649C05FB297 (confirmation_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game_over (id INT AUTO_INCREMENT NOT NULL, opponent_id INT DEFAULT NULL, movement_list LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', duration TIME DEFAULT NULL, is_winner TINYINT(1) NOT NULL, INDEX IDX_5FE9CF757F656CDC (opponent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C649A58CD FOREIGN KEY (player_one_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CFC6BF02 FOREIGN KEY (player_two_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C1CF398FB FOREIGN KEY (player_who_can_play_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE stats ADD CONSTRAINT FK_574767AA99E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game_over ADD CONSTRAINT FK_5FE9CF757F656CDC FOREIGN KEY (opponent_id) REFERENCES user (id)');
        $this->addSql('DROP TABLE sessions');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318C649A58CD');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318CFC6BF02');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318C1CF398FB');
        $this->addSql('ALTER TABLE stats DROP FOREIGN KEY FK_574767AA99E6F5DF');
        $this->addSql('ALTER TABLE game_over DROP FOREIGN KEY FK_5FE9CF757F656CDC');
        $this->addSql('CREATE TABLE sessions (sess_id VARCHAR(128) NOT NULL COLLATE utf8_bin, sess_data BLOB NOT NULL, sess_time INT UNSIGNED NOT NULL, sess_lifetime INT NOT NULL, PRIMARY KEY(sess_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE stats');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE game_over');
    }
}
