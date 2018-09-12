<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180912144853 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE game_over (id INT AUTO_INCREMENT NOT NULL, opponent_id INT DEFAULT NULL, movement_list LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', duration TIME DEFAULT NULL, is_winner TINYINT(1) NOT NULL, INDEX IDX_5FE9CF757F656CDC (opponent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE game_over ADD CONSTRAINT FK_5FE9CF757F656CDC FOREIGN KEY (opponent_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE player_in_game ADD game_id INT NOT NULL');
        $this->addSql('ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1ADE48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('CREATE INDEX IDX_6864F1ADE48FD905 ON player_in_game (game_id)');
        $this->addSql('ALTER TABLE game_over ADD player_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE game_over ADD CONSTRAINT FK_8D93D649EA667193 FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649EA667193 ON game_over (player_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649EA667193');
        $this->addSql('DROP TABLE game_over');
        $this->addSql('ALTER TABLE player_in_game DROP FOREIGN KEY FK_6864F1ADE48FD905');
        $this->addSql('DROP INDEX IDX_6864F1ADE48FD905 ON player_in_game');
        $this->addSql('ALTER TABLE player_in_game DROP game_id');
        $this->addSql('DROP INDEX IDX_8D93D649EA667193 ON game_over');
        $this->addSql('ALTER TABLE user DROP player_id');
    }
}
