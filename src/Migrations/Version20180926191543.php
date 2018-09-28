<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180926191543 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE stats DROP FOREIGN KEY FK_574767AA99E6F5DF');
        $this->addSql('DROP INDEX UNIQ_574767AA99E6F5DF ON stats');
        $this->addSql('ALTER TABLE stats DROP player_id');
        $this->addSql('ALTER TABLE user ADD stats_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64970AA3482 FOREIGN KEY (stats_id) REFERENCES stats (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D64970AA3482 ON user (stats_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE stats ADD player_id INT NOT NULL');
        $this->addSql('ALTER TABLE stats ADD CONSTRAINT FK_574767AA99E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_574767AA99E6F5DF ON stats (player_id)');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64970AA3482');
        $this->addSql('DROP INDEX UNIQ_8D93D64970AA3482 ON user');
        $this->addSql('ALTER TABLE user DROP stats_id');
    }
}
