<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180912125709 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE player_in_game (id INT AUTO_INCREMENT NOT NULL, player_id INT DEFAULT NULL, opponent_id INT DEFAULT NULL, last_move_time DATETIME DEFAULT NULL, last_move VARCHAR(255) DEFAULT NULL, allow_to_move TINYINT(1) NOT NULL, INDEX IDX_6864F1AD99E6F5DF (player_id), INDEX IDX_6864F1AD7F656CDC (opponent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1AD99E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1AD7F656CDC FOREIGN KEY (opponent_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE player_in_game');
    }
}
