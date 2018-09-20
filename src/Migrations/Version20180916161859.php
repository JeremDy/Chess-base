<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180916161859 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE player_in_game');
        $this->addSql('DROP TABLE sessions');
        $this->addSql('ALTER TABLE game ADD player_one_id INT DEFAULT NULL, ADD player_two_id INT DEFAULT NULL, ADD player_who_can_play_id INT DEFAULT NULL, ADD last_move VARCHAR(50) DEFAULT NULL, CHANGE ended_at last_move_time DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C649A58CD FOREIGN KEY (player_one_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CFC6BF02 FOREIGN KEY (player_two_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C1CF398FB FOREIGN KEY (player_who_can_play_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_232B318C649A58CD ON game (player_one_id)');
        $this->addSql('CREATE INDEX IDX_232B318CFC6BF02 ON game (player_two_id)');
        $this->addSql('CREATE INDEX IDX_232B318C1CF398FB ON game (player_who_can_play_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE player_in_game (id INT AUTO_INCREMENT NOT NULL, player_id INT DEFAULT NULL, opponent_id INT DEFAULT NULL, game_id INT NOT NULL, last_move_time DATETIME DEFAULT NULL, last_move VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, allow_to_move TINYINT(1) NOT NULL, color VARCHAR(10) NOT NULL COLLATE utf8mb4_unicode_ci, INDEX IDX_6864F1AD99E6F5DF (player_id), INDEX IDX_6864F1AD7F656CDC (opponent_id), INDEX IDX_6864F1ADE48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sessions (sess_id VARCHAR(128) NOT NULL COLLATE utf8_bin, sess_data BLOB NOT NULL, sess_time INT UNSIGNED NOT NULL, sess_lifetime INT NOT NULL, PRIMARY KEY(sess_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1AD7F656CDC FOREIGN KEY (opponent_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1AD99E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1ADE48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318C649A58CD');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318CFC6BF02');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318C1CF398FB');
        $this->addSql('DROP INDEX IDX_232B318C649A58CD ON game');
        $this->addSql('DROP INDEX IDX_232B318CFC6BF02 ON game');
        $this->addSql('DROP INDEX IDX_232B318C1CF398FB ON game');
        $this->addSql('ALTER TABLE game DROP player_one_id, DROP player_two_id, DROP player_who_can_play_id, DROP last_move, CHANGE last_move_time ended_at DATETIME DEFAULT NULL');
    }
}
