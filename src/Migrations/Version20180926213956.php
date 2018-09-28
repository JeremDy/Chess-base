<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180926213956 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE game_over ADD player_id INT NOT NULL');
        $this->addSql('ALTER TABLE game_over ADD CONSTRAINT FK_5FE9CF7599E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_5FE9CF7599E6F5DF ON game_over (player_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE game_over DROP FOREIGN KEY FK_5FE9CF7599E6F5DF');
        $this->addSql('DROP INDEX IDX_5FE9CF7599E6F5DF ON game_over');
        $this->addSql('ALTER TABLE game_over DROP player_id');
    }
}
